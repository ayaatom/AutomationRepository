package automation.execution.model;

public class ExecutionResultTestStep {
	
	private String testStepNumber;
	private String screen;
	private String control;
	private String action;
	private String screenShotPath;
	private String data;
	private String stepResult;
	private Long duration;
	private String description;

	public String getTestStepNumber() {
		return testStepNumber;
	}
	public void setTestStepNumber(String testStepNumber) {
		this.testStepNumber = testStepNumber;
	}
	public String getScreen() {
		return screen;
	}
	public void setScreen(String screen) {
		this.screen = screen;
	}
	public String getControl() {
		return control;
	}
	public void setControl(String control) {
		this.control = control;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getScreenShotPath() {
		return screenShotPath;
	}
	public void setScreenShotPath(String screenShotPath) {
		this.screenShotPath = screenShotPath;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getStepResult() {
		return stepResult;
	}
	public void setStepResult(String stepResult) {
		this.stepResult = stepResult;
	}
	public Long getDuration() {
		return duration;
	}
	public void setDuration(Long duration) {
		this.duration = duration;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
