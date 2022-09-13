import { isNil } from "lodash";

export function getTime() {
    const date = new Date()
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}

export function getNextField(id, order) {
    return order.find(el => el.id === id)?.next
}

//Функция для скрытия сообщения в чате звездочками
function getHiderValue(value) {
    return value.replace(/[\s\S]/g, "*")
}

export function updateMessages(currentField, getNextField, values, messages, setMessages) {
    isNil(values)
        ? setMessages([...messages, { ...(messages.find(el => el.id === getNextField)), answer: null, time: '', last: true }])
        : messages.filter(el => el.id === currentField).length > 1
            ? setMessages([...messages.map(el => el.id === currentField && isNil(el.answer)
                ? {
                    ...el, answer: (currentField === 'password' || currentField === 'password_repeat' || currentField === 'user_password')
                        ? getHiderValue(values[currentField])
                        : values[currentField], last: true
                }
                : { ...el, last: false }), { ...(messages.find(el => el.id === getNextField)), answer: null, visible: true, time: '', last: true },])
            : setMessages(messages.map(el => el.id === currentField
                ? {
                    ...el, answer: isNil(values)
                        ? null
                        : values[currentField].label
                            ? values[currentField].label
                            : currentField === 'password'
                                ? getHiderValue(values[currentField])
                                : currentField === 'passwordRepeat'
                                    ? getHiderValue(values[currentField])
                                    : values[currentField], last: true
                }
                : el.id === getNextField
                    ? {
                        ...el, question: (currentField === 'key' && values.key === 'Ключ')
                            ? 'Введите ключ'
                            : el.question, visible: true, time: getTime(), last: true
                    }
                    : { ...el, last: false }))
}