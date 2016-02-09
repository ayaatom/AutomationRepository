package automation.execution.model;

public class ExecutionResultTestCase {
	
	private String testCaseId;
	private String testCaseName;
	private String testCaseResult;
	private String testCaseDesc;
	private long testDuration;
	
	
	public ExecutionResultTestCase(String testCaseId, String testCaseName,String testCaseResult, String testCaseDesc,long testDuration) {
		super();
		this.testCaseId = testCaseId;
		this.testCaseName = testCaseName;
		this.testCaseResult = testCaseResult;
		this.testCaseDesc = testCaseDesc;
		this.testDuration=testDuration;
	}
	
	public ExecutionResultTestCase() {
		// TODO Auto-generated constructor stub
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

	public String getTestCaseResult() {
		return testCaseResult;
	}

	public void setTestCaseResult(String testCaseResult) {
		this.testCaseResult = testCaseResult;
	}

	public String getTestCaseDesc() {
		return testCaseDesc;
	}

	public void setTestCaseDesc(String testCaseDesc) {
		this.testCaseDesc = testCaseDesc;
	}
	
	public long getTestDuration() {
		return testDuration;
	}
	
	public void setTestDuration(long testDuration) {
		this.testDuration = testDuration;
	}
}
