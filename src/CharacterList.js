import React, {useState, useEffect} from "react";
import ModalEdit from "./ModalEdit";



export default function CharacterList() {
  const [character, setCharacter] = React.useState(null);
  const [characterList, setCharacterList] = useState([])
  
  const fileInput = React.createRef();
  const crypto = require("crypto");

  const newid = crypto.randomBytes(16).toString("hex");                                                  

  useEffect(() => {
    getCharacters();
  }, []);



  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characterList));
  }, [characterList]);

  function getCharacters() {
    
    if((localStorage.getItem('characters')!=='[null]') && localStorage.getItem('characters')){
        setCharacterList(JSON.parse(localStorage.getItem('characters')));
    }
    else{
      setCharacterList([{'id': "id0", 'name': 'Новый персонаж', 'strength': 0,
         "agility": 0, "charisma": 0, "intelligence": 0, "hp":3, 
         "evasion": 10, "energy": 0, "dmg": 0, "stealth": 0, "archery": 0,
         "educability": 0, "survival": 0, "medicine": 0, "intimidation": 0, 
         "insight": 0, "appearance": 0, "manipulation": 0
        }]);
    }  
}

  function editCharacter(value) {
    setCharacter(value);
  }

  function handleUpdate(value) {
    let arr = [...characterList];
    arr.map(item => {
      if (item.id === value.id){
         let indx = arr.indexOf(item)
         arr[indx] = value;
      }
    })
    setCharacterList(arr)
    setCharacter(null);
  }

  function newCharacter(){
    setCharacterList(
      [...characterList, {'id':newid, 'name': 'Новый персонаж', 'strength': 0,
      "agility": 0, "charisma": 0, "intelligence": 0, "hp":3, 
      "evasion": 10, "energy": 0, "dmg": 0, "stealth": 0, "archery": 0,
      "educability": 0, "survival": 0, "medicine": 0, "intimidation": 0, 
      "insight": 0, "appearance": 0, "manipulation": 0}]
    )
  }

  function readFile(event){
    event.preventDefault();
    let file = fileInput.current.files[0]
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let text = reader.result
      let downloadCharacter = JSON.parse(text)
      downloadCharacter.id = newid;
      setCharacterList(
        [...characterList, downloadCharacter]
      )

    }
    reader.onerror = () => {
      console.log(reader.error)
    }
    

  }
  return (
    <div className='wrapper'>
      <div className='charactersList'>
          Список персонажей:
          <ul>
          {characterList.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => editCharacter(item)} >Редактировать</button>
            </li>
          ))}
        </ul>
      </div>
      {character && <ModalEdit character={character} updateCharacter={handleUpdate} />}
      <div className="options">
        <button onClick={() => newCharacter()}>Новый персонаж</button>
        <form onSubmit={readFile}>
          <label>
            Загрузить персонажа из .txt файла:
            <input type="file" ref={fileInput} />
          </label>
          <br />
          <button type="submit">Загрузить</button>
        </form>   
      </div> 
    </div>
  );
}
