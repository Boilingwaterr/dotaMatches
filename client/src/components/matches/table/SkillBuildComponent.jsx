import React from 'react';
import Style from './SkillBuildComponent.module.css';

const SkillBuild = props => {
    
    if (props.show) {
        return <div className = { Style.skillBuildWrapper }>
            SKILLBUILD HERE LMAO
        </div>
    } else {
        return <></>
    }
}

export default SkillBuild;