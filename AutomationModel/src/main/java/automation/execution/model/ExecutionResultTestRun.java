package automation.execution.model;

import java.util.List;

public class ExecutionResultTestRun {
	
	private String testRunId;
	private String testRunName;
	private String result;
	private Long duration;
	private List<ExecutionResultTestRunDetail> resultTestRunDetails;
	private Integer iteration;	

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

	public List<ExecutionResultTestRunDetail> getResultTestRunDetails() {
		return resultTestRunDetails;
	}
	
	public void setResultTestRunDetails(List<ExecutionResultTestRunDetail> resultTestRunDetails) {
		this.resultTestRunDetails = resultTestRunDetails;
	}
	
	public Integer getIteration() {
		return iteration;
	}
	
	public void setIteration(Integer iteration) {
		this.iteration = iteration;
	}

}
