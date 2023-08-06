export async function fetchImg(name, page) {
  const paramsUrl = new URLSearchParams({
    key: '37004510-2ea806ed51befec1ac31d4b99',
    q: name,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const Url = 'https://pixabay.com/api/';

  try {
    const response = await fetch(`${Url}?${paramsUrl.toString()}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('Error fetching images:', error);
  }
}
