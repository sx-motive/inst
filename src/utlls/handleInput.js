export const handleInput = (el, state, set) => {
  if (el.target.name == 'media') {
    const url = el.target.files[0];
    if (url.size > 2097152) {
      alert('Sorry, but file should be less 2mb!');
    } else {
      set({ ...state, [el.target.name]: url });
      console.log(url);
    }
  } else set({ ...state, [el.target.name]: el.target.value });
};
