package automation.testcase.model;

public class TestCase {
	
	/*"testCaseName": "Test Case 1",
    "testCaseId": "TC1",
    "applicationName": "App Name",
    "applicationId": "C1",
	"createdBy": "user1",
    "createdDate": "04/20/2015"*/
	
	private String testCaseId;
	private String testCaseName;
	private String applicationName;
	private String applicationId;
	private String createdBy;
	private String createdDate;
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
