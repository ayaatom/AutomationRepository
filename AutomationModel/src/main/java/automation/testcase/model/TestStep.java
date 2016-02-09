package automation.testcase.model;

import java.util.List;

import automation.application.model.Action;
import automation.application.model.DataSet;

public class TestStep {
	
	private String testStepNumber;
	private String screenId;
	private String screenName;
	private String controlId;
	private String controlName;
	private Action action;
	private String createdDate;
	private String testStepDescription;
	private List<DataSet> dataSets;
	private String dataSet;
	private String testCaseId;
	private String applicationName;
	private String applicationId;
	private String objProp;
	private Double index;
	private String objPropType;
	
	public String getTestStepNumber() {
		return testStepNumber;
	}
	public void setTestStepNumber(String testStepNumber) {
		this.testStepNumber = testStepNumber;
	}
	public String getScreenId() {
		return screenId;
	}
	public void setScreenId(String screenId) {
		this.screenId = screenId;
	}
	public String getScreenName() {
		return screenName;
	}
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}
	public String getControlId() {
		return controlId;
	}
	public void setControlId(String controlId) {
		this.controlId = controlId;
	}
	public String getControlName() {
		return controlName;
	}
	public void setControlName(String controlName) {
		this.controlName = controlName;
	}
	
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public String getTestStepDescription() {
		return testStepDescription;
	}
	public void setTestStepDescription(String testStepDescription) {
		this.testStepDescription = testStepDescription;
	}
	public List<DataSet> getDataSets() {
		return dataSets;
	}
	public void setDataSets(List<DataSet> dataSets) {
		this.dataSets = dataSets;
	}
	public String getTestCaseId() {
		return testCaseId;
	}
	public void setTestCaseId(String testCaseId) {
		this.testCaseId = testCaseId;
	}
	public String getApplicationName() {
		return applicationName;
	}
	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}
	public String getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}
	
	public Action getAction() {
		return action;
	}
	public void setAction(Action action) {
		this.action = action;
	}
	public String getDataSet() {
		return dataSet;
	}
	public void setDataSet(String dataSet) {
		this.dataSet = dataSet;
	}
	public String getObjProp() {
		 return objProp;
	}
	public void setObjProp(String objProp) {
		this.objProp = objProp;
	}
	public Double getIndex() {
		return index;
	}
	public void setIndex(Double index) {
		this.index = index;
	}
	public String getObjPropType() {
		return objPropType;
	}
	public void setObjPropType(String objPropType) {
		this.objPropType = objPropType;
	}
}
