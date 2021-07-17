function Stat(props){
    return(
        <li>
        {props.statNameRu}
        <input type='number'
            value={props.statValue}
            onChange={e => props.handleChange(props.statName, e.target.value, props.subStat)}
          />
        </li>
    )
}

export default Stat;