export function makeConfig(Component,displayName){
    function Config({...other}){
        return <Component columns={columns} data={data} {...other}/>
    }
    Config.displayName = displayName+'MakeConfig'
    return Config
}