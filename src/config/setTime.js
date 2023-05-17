import moment from 'moment'

export default function setTime(date) {
  var isCurrent = moment(date).isBetween(moment().subtract(7, 'days'), moment())
  if (isCurrent) {
    return moment(date).fromNow()
  } else {
    return moment(date).format('MMM Do')
  }
}
