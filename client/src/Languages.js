export default function Languages({languagesList,cb}) {
    return (
        <select onClick={cb}>
            {languagesList.map((lang,i) => 
                <option 
                    value={Object.values(lang)} key={i}>
                    {Object.keys(lang)}
                </option>)}
        </select>
    )
}
