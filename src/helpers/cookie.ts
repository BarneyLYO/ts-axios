const createCookieRegex = (name: string) => new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')

const cookie = {
  read(name: string): string | null {
    const matcher = document.cookie.match(new RegExp(createCookieRegex(name)))
    return matcher ? decodeURIComponent(matcher[3]) : null
  }
}

export default cookie
