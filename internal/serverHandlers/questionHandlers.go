package serverhandlers

import (
	"back-end/pkg/structs"
	"net/http"

	"github.com/gorilla/mux"
)

func (q *QuestionHandler) GetDiseaseQuestions(w http.ResponseWriter, r *http.Request) {
	var ctxKey structs.CtxKey
	values := r.Context().Value(ctxKey).(map[string]interface{})
	_ = values["userId"].(int)

	vars := mux.Vars(r)

}
