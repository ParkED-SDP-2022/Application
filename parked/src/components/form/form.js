
function Form() {

    const content = {
        inputs: [
            {
                label: 'Bench Number',
                name: 'bench number',
            },
            {
                label: 'New Location',
                name: 'new location',
            },
        ],
    };

    return (
        <>
        <h1>Move a Bench:</h1>
        <form>
            {content.inputs.map((input,key) => {
                return (
                    <div key={key}>
                        <p>
                            <label className='label'>{input.label}</label>
                        </p>
                        <p>
                            <input name={input.name} className="input"/>
                        </p>
                    </div>
                );
            })}
            <button className='green_button' type='submit'>Submit</button>
        </form>
        </>
    )
}

export default Form;