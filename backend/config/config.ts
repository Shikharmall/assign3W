const jwtSecret: string = process.env.CONFIG_SECRET_KEY as string; //type casted as string

module.exports = {
  jwtSecret
}