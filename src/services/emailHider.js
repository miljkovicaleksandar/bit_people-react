const emailHider = (email) => {
    const at = email.indexOf("@");
    const firstThree = email.slice(0, 3);
    const lastThree = email.slice(at - 3, at);
    const rest = email.slice(at);
    return `${firstThree}...${lastThree}${rest}`;
}

export default emailHider;