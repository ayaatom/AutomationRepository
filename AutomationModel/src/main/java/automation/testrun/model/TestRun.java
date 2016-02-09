package automation.testrun.model;


public class TestRun {

	private String testRunId;
	private String testRunName;
	private String applicationName;
	private String applicationId;
	private String createdBy;
	private String createdDate;
	
	public String getTestRunId() {
		return testRunId;
	}
	public void setTestRunId(String testRunId) {
		this.testRunId = testRunId;
	}
	public String getTestRunName() {
		return testRunName;
	}
	public void setTestRunName(String testRunName) {
		this.testRunName = testRunName;
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
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	
}
