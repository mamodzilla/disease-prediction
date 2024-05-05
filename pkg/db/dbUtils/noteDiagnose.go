package dbutils

import "time"

func (d *DiseasePredictionDb) NoteDiagnose(userId int) (int64, error) {
	startDate := time.Now().Format("2006-01-02")

	var diagnoseId int64
	err := d.Db.QueryRow(noteDiagnoseQuery, userId, startDate).Scan(&diagnoseId)
	if err != nil {
		return -1, err
	}
	return diagnoseId, nil
}

func (d *DiseasePredictionDb) NoteDiagnoseData(diagnoseId int64, symptomText string, diseaseName string, diseaseDescription string) error {
	_, err := d.Db.Exec(noteDiagnoseDataQuery, diagnoseId, symptomText, diseaseName, diseaseDescription)
	if err != nil {
		return err
	}
	return nil
}
