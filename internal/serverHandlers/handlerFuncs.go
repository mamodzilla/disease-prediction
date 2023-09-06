package serverhandlers

func NewServer() *Server {
	return &Server{}
}

func (s *Server) NewAccountHandler() *AccountHandler {
	return &AccountHandler{Server: s}
}
