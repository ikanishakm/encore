/**
 * Encore fork: the hosted update-checker (which polled updates.theatrejs.com
 * every 30 minutes) has been removed. Encore does not phone home.
 *
 * This is a no-op kept so existing call sites (Studio._init) keep working.
 * Self-hosters who want an update notifier can reimplement this against their
 * own endpoint.
 */
export default async function checkForUpdates(): Promise<void> {
  return
}
