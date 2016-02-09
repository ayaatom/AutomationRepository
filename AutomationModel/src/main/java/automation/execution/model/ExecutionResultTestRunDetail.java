package automation.execution.model;

import java.util.List;

public class ExecutionResultTestRunDetail {
	
	private String testRunDetailId;
	private String testCaseId;
	private String testCaseName;
	private String result;
	private Long duration;
	private List<ExecutionResultTestStep> resultTestSteps;
	private Integer iteration;
	private String videoPath;
	
	public String getTestRunDetailId() {
		return testRunDetailId;
	}
	
	public void setTestRunDetailId(String testRunDetailId) {
		this.testRunDetailId = testRunDetailId;
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

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Long getDuration() {
		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;
	}
	
	public List<ExecutionResultTestStep> getResultTestSteps() {
		return resultTestSteps;
	}
	
	public void setResultTestSteps(List<ExecutionResultTestStep> resultTestSteps) {
		this.resultTestSteps = resultTestSteps;
	}

	public Integer getIteration() {
		return iteration;
	}
	
	public void setIteration(Integer iteration) {
		this.iteration = iteration;
	}

	public String getVideoPath() {
		return videoPath;
	}
	
	public void setVideoPath(String videoPath) {
		this.videoPath = videoPath;
	}

}
