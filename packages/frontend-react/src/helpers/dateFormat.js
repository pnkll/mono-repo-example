import moment from "moment/moment";

export function dateFormat(value, type) {
    switch (type) {
        case 'table':
            return moment(value).locale('ru').format("Do MMMM YYYY")
        case 'task_create':
            return moment(value).format('DD.MM.YYYY')
    }
}