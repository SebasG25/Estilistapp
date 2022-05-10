import { toast } from 'react-toastify'

export const notifySuccess = () => {
    toast.success("¡Registrado exitosamente!", {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export const notifyError = () => {
    toast.error("¡Hubo un error!", {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export const notifySignInError = () => {
    toast.error("¡Correo o contraseña incorrecta!", {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export const notifyWarning = (text) => {
    toast.warn(text, {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export const notifyCancelEdit = () => {
    toast.warn("Cambios cancelados", {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export const notifySuccessEdit = () => {
    toast.success("¡Cambios realizados exitosamente!", {
        position: toast.POSITION.BOTTOM_CENTER
    })
}