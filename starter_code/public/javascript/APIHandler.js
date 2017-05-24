class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  // get all the characters
  getFullList () {
    $.ajax({
      method: 'GET',
      url: 'http://ih-api.herokuapp.com/characters',
      success: this.loadList,
      error: this.handleError,
    });
  }

// get one characer by the id
  getOneRegister () {

    const characterId = $("[name='character-id']").val();

    $.ajax({
      method: 'GET',
      url: `http://ih-api.herokuapp.com/characters/${characterId}`,
      success: this.loadList,
      error: this.handleError
    });
  }

  // create one character
  createOneRegister () {

    const newCharacterInfo = {
      name: $("#new-character-form [name='name']").val(),
      occupation: $("#new-character-form [name='occupation']").val(),
      weapon: $("#new-character-form [name='weapon']").val(),
      debt: $("#new-character-form [name='debt']").prop("checked")
    };

    $.ajax({
      method: 'POST',
      url: 'http://ih-api.herokuapp.com/characters',
      data: newCharacterInfo,
      success: this.loadList,
      error: this.handleError
    });
  }

  // update character
  updateOneRegister () {

    const characterId = $("[name='chr-id']").val();

    const editCharacter = {
      name: $("#edit-character-form [name='name']").val(),
      occupation: $("#edit-character-form [name='occupation']").val(),
      weapon: $("#edit-character-form [name='weapon']").val(),
      debt: $("#edit-character-form [name='debt']").prop("checked")
    };

    $.ajax({
      method: 'PUT',
      url: `http://ih-api.herokuapp.com/characters/${characterId}`,
      data: editCharacter,
      success: this.loadList,
      error: this.handleError
    });
  }

  // delete character
  deleteOneRegister () {

    const characterId = $("[name='character-id-delete']").val();

    $.ajax({
      method: 'DELETE',
      url: `http://ih-api.herokuapp.com/characters/${characterId}`,
      success: this.loadList,
      error: this.handleError
    });
  }


  // CALLBACKS ----------------------------------------

  // on success
  loadList (response) {

    $('.characters-container').empty();

    if (response.length > 1) {
      response.forEach( (eachCharacter) => {
        const loadCharacter = `
          <div class="character-info">
            <div>Character Name: ${eachCharacter.name}</div>
            <div>Character Occupation: ${eachCharacter.occupation}</div>
            <div>character Debt: ${eachCharacter.debt}</div>
            <div>Character Weapon: ${eachCharacter.weapon}</div>
          </div>
        `;

        $('.characters-container').append(loadCharacter);
      });
    }
    else {
      const loadCharacter = `
        <div class="character-info">
          <div>Character Name: ${response.name}</div>
          <div>Character Occupation: ${response.occupation}</div>
          <div>character Debt: ${response.debt}</div>
          <div>Character Weapon: ${response.weapon}</div>
        </div>
      `;

      $('.characters-container').append(loadCharacter);
    }
  }

  // on error
  handleError () {
    console.log('Oh no! Error.');
  }

}
