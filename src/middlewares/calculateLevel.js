const calculateLevel = (level) => {
    let result = 0;
    if (level === 'beginner'){
        result = 600;
    }else if(level === 'intermediate'){
        result = 1200;
    }else{
        result = 1800;
    }
    return result;
}

export default calculateLevel;