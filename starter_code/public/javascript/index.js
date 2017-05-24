const minion = new APIHandler("http://ih-api.herokuapp.com");

$(document).ready( () => {
  $('#fetch-all').on('click', (event) => {
    event.preventDefault();
    minion.getFullList();
  });

  $('#fetch-one').on('click', (event) => {
    event.preventDefault();
    minion.getOneRegister();
  });

  $('#delete-one').on('click', (event) => {
    event.preventDefault();
    minion.deleteOneRegister();
  });

  $('#edit-character-form').on('submit', (event) => {
    event.preventDefault();
    minion.updateOneRegister();
  });

  $('#new-character-form').on('submit', (event) => {
    event.preventDefault();
    minion.createOneRegister();
  });

  setInterval( () => {
    $.ajax({
      method: 'GET',
      url: 'https://ih-api.herokuapp.com/characters/',
      success: minion.loadList,
      error: minion.handleError
    });
  }, 500);
});
