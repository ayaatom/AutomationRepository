package automation.execution.model;

import java.util.Date;
import java.util.List;
public class ExecutionBuildResult {
	
	private String buildId;
	private String buildName;
	
	private String machineName;
	private String buildResult;
	private Date startTime;
	private Date endTime;
	private Long duration;
	private ExecutionResultTestRun resultTestRun;
	private List<ExecutionResultTestRun> resultTestRuns;
	private Integer passCounter;
	private Integer failCounter;
	
	public String getBuildId() {
		return buildId;
	}
	public void setBuildId(String buildId) {
		this.buildId = buildId;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public String getBuildResult() {
		return buildResult;
	}
	public void setBuildResult(String buildResult) {
		this.buildResult = buildResult;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Long getDuration() {
		return duration;
	}
	public void setDuration(Long duration) {
		this.duration = duration;
	}
	
	public ExecutionResultTestRun getResultTestRun() {
		return resultTestRun;
	}
	
	public void setResultTestRun(ExecutionResultTestRun resultTestRun) {
		this.resultTestRun = resultTestRun;
	}
	
	public List<ExecutionResultTestRun> getResultTestRuns() {
		return resultTestRuns;
	}
	
	public void setResultTestRuns(List<ExecutionResultTestRun> resultTestRuns) {
		this.resultTestRuns = resultTestRuns;
	}
	
	public Integer getPassCounter() {
		return passCounter;
	}
	public void setPassCounter(Integer passCounter) {
		this.passCounter = passCounter;
	}
	
	public Integer getFailCounter() {
		return failCounter;
	}
	public void setFailCounter(Integer failCounter) {
		this.failCounter = failCounter;
	}
	public String getBuildName() {
		return buildName;
	}
	public void setBuildName(String buildName) {
		this.buildName = buildName;
	}
}