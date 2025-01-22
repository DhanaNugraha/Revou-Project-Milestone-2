const LoginRegisterForm = ({email, setEmail, password, setPassword, onSubmit, formType, isLoading}:any) => {
    const submitButtonStyling = "border text-[1em] font-medium bg-[#242424] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]"

  return (
        <form onSubmit={onSubmit} className={"flex flex-col place-items-center p-[10%]"}>
            <fieldset className="formFill email">
                <label htmlFor="email">Email </label>
                <input type="email" name="email" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
            </fieldset>

            <fieldset className="formFill password">
                <label htmlFor="password">Password </label>
                <input type="password" name="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
            </fieldset>

            <fieldset className={submitButtonStyling}>
            <button type="submit" disabled={isLoading}>{isLoading? "Loading..." : formType}</button>
            </fieldset>
        </form>
    )
}

export default LoginRegisterForm;