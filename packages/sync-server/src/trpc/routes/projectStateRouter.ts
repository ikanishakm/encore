import {z} from 'zod'
import {TRPCError} from '@trpc/server'
import {createRouter, procedure} from '..'
import type {ServerContext} from '..'
import type {Session} from 'src/utils/authUtils'
import {getSaazBack} from 'src/saaz'
import {studioApiClient} from 'src/appClient'
import {observable} from '@trpc/server/observable'

const studioAuth = z.object({
  accessToken: z.string(),
})

async function ensureSessionHasAccessToProject(
  session: Session,
  projectId: string,
): Promise<boolean> {
  const {canEdit} = await studioApiClient.studioAuth.canIEditProject.query({
    studioAuth: {accessToken: session._accessToken},
    projectId,
  })
  return canEdit
}

/**
 * Verifies the caller's session AND that they may edit the requested project.
 * Every saaz_* procedure must go through this — without it any signature-valid
 * token could read/write any project's state by supplying its dbName (IDOR).
 */
async function requireSessionWithProjectAccess(opts: {
  ctx: ServerContext
  input: {dbName: string; studioAuth: {accessToken: string}}
}): Promise<Session> {
  const session = await opts.ctx.requireValidSession(opts)
  const hasAccess = await ensureSessionHasAccessToProject(
    session,
    opts.input.dbName,
  )
  if (!hasAccess) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have access to this project.',
    })
  }
  return session
}

export const projectState = createRouter({
  saaz_applyUpdates: procedure
    .input(z.object({dbName: z.string(), opts: z.any(), studioAuth}))
    .output(z.any())
    .mutation(async (opts) => {
      await requireSessionWithProjectAccess(opts)
      return getSaazBack(opts.input.dbName).applyUpdates(opts.input.opts)
    }),

  saaz_updatePresence: procedure
    .input(z.object({dbName: z.string(), opts: z.any(), studioAuth}))
    .output(z.any())
    .mutation(async (opts) => {
      await requireSessionWithProjectAccess(opts)
      return getSaazBack(opts.input.dbName).updatePresence(opts.input.opts)
    }),

  saaz_closePeer: procedure
    .input(
      z.object({
        dbName: z.string(),
        opts: z.object({peerId: z.string()}),
        studioAuth,
      }),
    )
    .output(z.any())
    .mutation(async (opts) => {
      await requireSessionWithProjectAccess(opts)
      return getSaazBack(opts.input.dbName).closePeer(opts.input.opts)
    }),

  saaz_getUpdatesSinceClock: procedure
    .input(z.object({dbName: z.string(), opts: z.any(), studioAuth}))
    .output(z.any())
    .query(async (opts) => {
      await requireSessionWithProjectAccess(opts)
      return getSaazBack(opts.input.dbName).getUpdatesSinceClock(
        opts.input.opts,
      )
    }),

  saaz_getLastIncorporatedPeerClock: procedure
    .input(
      z.object({
        dbName: z.string(),
        opts: z.object({peerId: z.string()}),
        studioAuth,
      }),
    )
    .output(z.any())
    .query(async (opts) => {
      await requireSessionWithProjectAccess(opts)
      return getSaazBack(opts.input.dbName).getLastIncorporatedPeerClock(
        opts.input.opts,
      )
    }),

  saaz_subscribe: procedure
    .input(z.object({dbName: z.string(), opts: z.any(), studioAuth}))
    .output(z.any())
    .subscription(async (opts) => {
      await requireSessionWithProjectAccess(opts)
      return observable<{}>((emit) => {
        const unsubPromise = getSaazBack(opts.input.dbName).subscribe(
          opts.input.opts,
          (s) => {
            emit.next(s)
          },
        )

        return () => {
          void unsubPromise.then((unsub) => unsub())
        }
      })
    }),
})
