package structs

type Config struct {
	Server
	Db
}

type Server struct {
	Host string
	Port string
}

type Db struct {
	Host     string
	Port     string
	User     string
	Password string
	DbName   string
}
