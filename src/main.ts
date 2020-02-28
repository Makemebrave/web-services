import Album from './models/album';

async function run() {
  const findAlbum = await Album.findById<Album>(4, { includes: ['user', 'photo'] });
  console.log(findAlbum);

  /* const newAlbum = new Album(5, 'Eragon')
  await Album.create(newAlbum) */

  // const editAlbum = new Album(4, 'Star wars 5')
  // await Album.updateById({id: 4, title: 'Star wars IV'})


  debugger;
}

run().catch((err) => {
  console.error(err);
});
