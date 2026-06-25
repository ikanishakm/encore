import React, {useCallback} from 'react'
import styled from 'styled-components'
import {CgSelect} from 'react-icons/cg'

const Container = styled.div`
  width: 100%;
  position: relative;
`

const IconContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  width: 1.5em;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: var(--tt-fg-muted);
  pointer-events: none;
`

const Select = styled.select`
  appearance: none;
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid transparent;
  color: var(--tt-fg);
  padding: 1px 6px;
  font: inherit;
  outline: none;
  text-align: left;
  width: 100%;
  border-radius: var(--tt-radius-sm);
  /*
  looks like putting percentages in the height of a select box doesn't work in Firefox. Not sure why.
  So we're hard-coding the height to 26px, unlike all other inputs that use a relative height.
  */
  height: 26px /* calc(100% - 4px); */;

  @supports (-moz-appearance: none) {
    /* Ugly hack to remove the extra left padding that shows up only in Firefox */
    text-indent: -2px;
  }

  &:hover {
    background-color: var(--tt-input);
    border-color: var(--tt-border);
  }

  &:focus {
    background-color: var(--tt-input);
    border-color: var(--tt-primary);
    box-shadow: 0 0 0 2px var(--tt-ring);
  }
`

function BasicSelect<TLiteralOptions extends string>({
  value,
  onChange,
  options,
  className,
  autoFocus,
}: {
  value: TLiteralOptions
  onChange: (val: TLiteralOptions) => void
  options: Record<TLiteralOptions, string>
  className?: string
  autoFocus?: boolean
}) {
  const _onChange = useCallback(
    (el: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(String(el.target.value) as TLiteralOptions)
    },
    [onChange],
  )

  return (
    <Container>
      <Select
        className={className}
        value={value}
        onChange={_onChange}
        autoFocus={autoFocus}
      >
        {Object.keys(options).map((key, i) => (
          <option key={'option-' + i} value={key}>
            {options[key]}
          </option>
        ))}
      </Select>
      <IconContainer>
        <CgSelect />
      </IconContainer>
    </Container>
  )
}

export default BasicSelect
