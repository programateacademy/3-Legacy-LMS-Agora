import ACTIONS from './index'


export const dispatchMenu = () => {
    return {
        type: ACTIONS.VIEW_MENU
    }
}

export const dispatchMenuHide = () => {
    return {
        type:ACTIONS.HIDE_MENU
    }
}
