
const Rating = ({value, onChange})=> {

    return(
        <div>
            <span onClick={()=>onChange && onChange(1)}>{value >= 1 ?'⭐':'✰'}</span>
            <span onClick={()=>onChange && onChange(2)}>{value >= 2 ?'⭐':'✰'}</span>
            <span onClick={()=>onChange && onChange(3)}>{value >= 3 ?'⭐':'✰'}</span>
            <span onClick={()=>onChange && onChange(4)}>{value >= 4 ?'⭐':'✰'}</span>
            <span onClick={()=>onChange && onChange(5)}>{value >= 5 ?'⭐':'✰'}</span>
        </div>
    )

}

export default Rating