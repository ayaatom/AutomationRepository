package automation.execution.model;

import java.util.List;

import automation.application.model.Machine;

public class ExecutionDetails {
	
	private String executionId;
	private String applicationId;
	private String applicationName;
	private String envURL;
	private String browser;
	private String gridMode;
	private String testCaseId;
	private String testRunId;
	private ExecutionBuildResult buildResult;
	private List<ExecutionResultTestStep> executionTestStepResults;
	private List<ExecutionResultTestCase> executionTestCaseResults;
	private List<ExecutionResultTestRun> executionResultTestRuns;
	private Machine machine;
	private String executionStartTime;
	private String executionEndTime;
	private String buildId;
	private String buildName;
	
	public String getExecutionId() {
		return executionId;
	}
	public void setExecutionId(String executionId) {
		this.executionId = executionId;
	}
	/*private String environment;
	private String settingsId;
	*/
	public String getEnvURL() {
		return envURL;
	}
	public void setEnvURL(String envURL) {
		this.envURL = envURL;
	}
	public Machine getMachine() {
		return machine;
	}
	public void setMachine(Machine machine) {
		this.machine = machine;
	}
	public String getBrowser() {
		return browser;
	}
	public void setBrowser(String browser) {
		this.browser = browser;
	}
	public String getGridMode() {
		return gridMode;
	}
	public void setGridMode(String gridMode) {
		this.gridMode = gridMode;
	}
	/*public String getEnvironment() {
		return environment;
	}
	public void setEnvironment(String environment) {
		this.environment = environment;
	}
	public String getSettingsId() {
		return settingsId;
	}
	public void setSettingsId(String settingsId) {
		this.settingsId = settingsId;
	}*/
	public String getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}
	public String getApplicationName() {
		return applicationName;
	}
	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}
	public String getTestCaseId() {
		return testCaseId;
	}
	public void setTestCaseId(String testCaseId) {
		this.testCaseId = testCaseId;
	}
	public String getTestRunId() {
		return testRunId;
	}
	public void setTestRunId(String testRunId) {
		this.testRunId = testRunId;
	}
	public List<ExecutionResultTestStep> getExecutionTestStepResults() {
		return executionTestStepResults;
	}
	public void setExecutionTestStepResults(List<ExecutionResultTestStep> executionTestStepResults) {
		this.executionTestStepResults = executionTestStepResults;	
	}
	public List<ExecutionResultTestCase> getExecutionTestCaseResults() {
		return executionTestCaseResults;
	}
	public void setExecutionTestCaseResults(List<ExecutionResultTestCase> executionTestStepResults) {
		this.executionTestCaseResults = executionTestStepResults;		
	}
	public String getExecutionStartTime() {
		return executionStartTime;
	}
	public void setExecutionStartTime(String executionStartTime) {
		this.executionStartTime = executionStartTime;
	}
	public String getExecutionEndTime() {
		return executionEndTime;
	}
	public void setExecutionEndTime(String executionEndTime) {
		this.executionEndTime = executionEndTime;
	}
	public List<ExecutionResultTestRun> getExecutionResultTestRuns() {
		return executionResultTestRuns;
	}
	public void setExecutionResultTestRuns(List<ExecutionResultTestRun> executionResultTestRuns) {
		this.executionResultTestRuns = executionResultTestRuns;
	}
	public String getBuildId() {
		return buildId;
	}
	public void setBuildId(String buildId) {
		this.buildId = buildId;
	}
	public ExecutionBuildResult getBuildResult() {
		return buildResult;
	}
	public void setBuildResult(ExecutionBuildResult buildResult) {
		this.buildResult = buildResult;
	}
	public String getBuildName() {
		return buildName;
	}
	public void setBuildName(String buildName) {
		this.buildName = buildName;
	}
}