function isNumber(value)
{
    return typeof(value) === "number";
}
const isString = function(value)
{
    return typeof(value) === "string";  
}

toInt = value  => parseInt(value,10);

function between(value,min,max,inclusive=false)
{
    if(!isNumber(value) || !isNumber(min) || !isNumber(max))
    {
        throw new Error("invalid number, please try again");
    }
    if(min > max) throw new Error("min is greater than max, please try again");
    if(inclusive) 
        return (value >= min && value <= max);
    return false;   
}

function toIPv4(...octets)
{
    if(octets.length != 4) throw new Error("Make sure include 4 octes");
    octets.forEach( string =>
    {
        if(!isString(string)) throw new Error("Make sure octes have string type");
    })
    let numOctets = octets.map( str => 
    {
        if(!between(parseInt(str,10),0,255,true)) 
            throw new Error("Error valid of octes, make sure between 0 and 255");
        return parseInt(str,10);
    })
    return `${numOctets[0]}.${numOctets[1]}.${numOctets[2]}.${numOctets[3]}`;
}