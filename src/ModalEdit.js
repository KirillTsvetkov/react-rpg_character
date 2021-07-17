import React, {useEffect} from "react";
import { saveAs } from 'file-saver';
import Stat from "./Stat";

export default function ModalEdit(props) {
  const [character, setCharacter] = React.useState(props.character);
  
  function handleChange(key, value, subStat=null) {
    setCharacter({
      ...character,
      [key]: value
    });
  }

  function handleSkillChange(key, value, stat=null) {
    if(stat){
      console.log(stat, value)
      if(character[stat] >= value){
        setCharacter({
          ...character,
          [key]: value
        });
      }
    }

    
  }

  useEffect(() => {
    if(character){
      let hp = 3 + Number(character.strength)
      setCharacter({
        ...character,
        'hp': hp
      });
    }
    
  }, []);

  useEffect(() => {
    let hp = 3 + Number(character.strength)
    setCharacter({
      ...character,
      'hp': hp
    });
  }, [character.strength]);

  useEffect(() => {
    let hp = 3 + Number(character.strength)
    setCharacter({
      ...character,
      'hp': hp
    });
  }, [character.strength]);


  useEffect(() => {
    let evasion = 10 + Number(character.agility)
    setCharacter({
      ...character,
      'evasion': evasion
    });
  }, [character.evasion]);

  function download(character){
    let text = JSON.stringify(character);
    let filename = 'character.txt';
    var blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
     });
     
     saveAs(blob, filename);
  }

  function handleSubmit() { 
    console.log("===> todo edit submit!!");
    props.updateCharacter(character);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Имя</label>
          <input name="name"
            value={character.name}
            onChange={e => handleChange("name", e.target.value)}
          />
          <ul>
            <Stat statValue={character.strength} handleChange={handleChange} subStat='hp' statName={"strength"} statNameRu='Сила'/>
            <Stat statValue={character.agility} handleChange={handleChange} statName={"agility"}  statNameRu='Ловкость'/>
            <Stat statValue={character.charisma} handleChange={handleChange} statName={"charisma"}  statNameRu='Харизма'/>
            <Stat statValue={character.intelligence} handleChange={handleChange} statName={"intelligence"}  statNameRu='Интелект'/>
            <li>Жизненная сила: {character.hp} </li>
            <li>Уклонение: {character.evasion}</li>
            <li>Энергия: {Number(character.agility) + Number(character.intelligence)}</li>
            <Stat statValue={character.dmg} handleChange={handleSkillChange} statName={"dmg"} subStat='strength' statNameRu='Урон'/>
            <Stat statValue={character.stealth} handleChange={handleSkillChange} statName={"stealth"} subStat='agility' statNameRu='Скрытность'/>
            <Stat statValue={character.archery} handleChange={handleSkillChange} statName={"archery"}  subStat='agility' statNameRu='Стрельба из лука'/>
            <Stat statValue={character.educability} handleChange={handleSkillChange} statName={"educability"}  subStat='intelligence' statNameRu='Обучаемость'/>
            <Stat statValue={character.survival} handleChange={handleSkillChange} statName={"survival"}  subStat='intelligence' statNameRu='Выживание'/>
            <Stat statValue={character.medicine} handleChange={handleSkillChange} statName={"medicine"}  subStat='intelligence' statNameRu='Медицина'/>
            <Stat statValue={character.intimidation} handleChange={handleSkillChange} statName={"intimidation"}  subStat='charisma' statNameRu='Запугивание'/>
            <Stat statValue={character.insight} handleChange={handleSkillChange} statName={"insight"}  subStat='charisma' statNameRu='Проницательность'/>
            <Stat statValue={character.appearance} handleChange={handleSkillChange} statName={"appearance"}  subStat='charisma' statNameRu='Внешний вид'/>
            <Stat statValue={character.manipulation} handleChange={handleSkillChange} statName={"manipulation"}  subStat='charisma' statNameRu='Манипкляция'/>
          </ul>
          
        <button type="submit">Сохранить изменения</button>
        <button type="button" onClick={() => download(character)}>Скачать</button>
      </form>
     
    </div>
  );
}
