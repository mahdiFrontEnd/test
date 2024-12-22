import BrokenImage from './assets/images/users/user0.PNG';



export const getExtension = (filename) => {
  if (
    filename.split('.').pop().toLowerCase() === 'png' ||
    filename.split('.').pop().toLowerCase() === 'jpg' ||
    filename.split('.').pop().toLowerCase() === 'jpeg'
  ) {
    return true;
  }
  return false;
};

export const imageOnLoad = (event) => {
  if (!event.currentTarget.className?.includes('error')) {
    event.currentTarget.className = `${event.currentTarget.className} success`;
  }
};
export const imageOnError = (event) => {
  event.currentTarget.src = BrokenImage;
  event.currentTarget.className = `${event.currentTarget.className} error`;
};
