export const getSavedTheme = () => {
    return localStorage.getItem('selectedTheme') || 'Select Mode';
  };
  