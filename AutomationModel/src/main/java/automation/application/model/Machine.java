package automation.application.model;

public class Machine {

	private String machineId;
	private String machineName;
	private String machineHost;
	private String machinePort;
	private String machineDesc;
	
	private String applicationId;
	private String applicationName;
	
	public String getMachineId() {
		return machineId;
	}
	public void setMachineId(String machineId) {
		this.machineId = machineId;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public String getMachineHost() {
		return machineHost;
	}
	public void setMachineHost(String machineHost) {
		this.machineHost = machineHost;
	}
	public String getMachinePort() {
		return machinePort;
	}
	public void setMachinePort(String machinePort) {
		this.machinePort = machinePort;
	}
	public String getMachineDesc() {
		return machineDesc;
	}
	public void setMachineDesc(String machineDesc) {
		this.machineDesc = machineDesc;
	}
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
	
}
