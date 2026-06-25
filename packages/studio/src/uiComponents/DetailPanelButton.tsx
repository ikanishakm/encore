import styled from 'styled-components'

const DetailPanelButton = styled.button<{disabled?: boolean}>`
  text-align: center;
  padding: 8px;
  border-radius: var(--tt-radius-sm);
  border: 1px solid var(--tt-primary);
  background-color: var(--tt-primary);
  color: var(--tt-primary-fg);
  font-weight: 400;
  display: block;
  appearance: none;
  flex-grow: 1;
  cursor: ${(props) => (props.disabled ? 'none' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  &:hover {
    background-color: var(--tt-primary-hover);
    border-color: var(--tt-primary-hover);
  }
`

export default DetailPanelButton
