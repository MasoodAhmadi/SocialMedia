var timeout = 0;

export function rerender(render, setRender) {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    setRender(render + 1);
  }, 60000);
}
