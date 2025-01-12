import placeholderUrl from '@/img/no-image.jpg';

function placeholderImage(event) {
  if (!event) {
    return false;
  }

  const image = event.target;

  if (!image || image.isPlaceholdered) {
    return false;
  }

  image.src = placeholderUrl;
  image.isPlaceholdered = true;

  return true;
}

export default placeholderImage;
