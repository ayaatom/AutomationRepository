package automation.testrun.model;


public class TestRunDetail {
	
	private String testRunDetailId;
	private String testRunBuildId;
	private String testRunId;
	private String testRunName;
	private String applicationName;
	private String applicationId;
	private String testCaseId;
	private String testCaseName;
	private String browserMode;
	private String externalData;
	private String dataSource;
	private Integer index;
	
	public String getTestRunDetailId() {
		return testRunDetailId;
	}
	public void setTestRunDetailId(String testRunDetailId) {
		this.testRunDetailId = testRunDetailId;
	}
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
	public String getTestCaseId() {
		return testCaseId;
	}
	public void setTestCaseId(String testCaseId) {
		this.testCaseId = testCaseId;
	}
	public String getTestCaseName() {
		return testCaseName;
	}
	public void setTestCaseName(String testCaseName) {
		this.testCaseName = testCaseName;
	}
	public String getBrowserMode() {
		return browserMode;
	}
	public void setBrowserMode(String browserMode) {
		this.browserMode = browserMode;
	}
	public String getExternalData() {
		return externalData;
	}
	public void setExternalData(String externalData) {
		this.externalData = externalData;
	}
	public String getDataSource() {
		return dataSource;
	}
	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}
	public String getTestRunBuildId() {
		return testRunBuildId;
	}
	public void setTestRunBuildId(String testRunBuildId) {
		this.testRunBuildId = testRunBuildId;
	}
	public Integer getIndex() {
		return index;
	}
	public void setIndex(Integer index) {
		this.index = index;
	}

}
