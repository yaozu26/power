import YZRequest from './request'

export function getPowerScreenData() {
  return YZRequest.get({
    url: "/powerscreen"
  })
}