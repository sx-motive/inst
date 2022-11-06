export const handleInput = (el, state, set) => {
  if (el.target.name == 'media') {
    const url = el.target.files[0];
    set({ ...state, [el.target.name]: url });
  } else set({ ...state, [el.target.name]: el.target.value });
};
