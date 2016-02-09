package automation.application.model;

import java.util.List;

public class Screen {
	
	private String id;
	private String applicationName;
	private String applicationId;
	
	private String title;
	private Boolean isChecked;
	private String objProp;
    
	private List<Control> nodes;
	private String type;

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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(Boolean isChecked) {
		this.isChecked = isChecked;
	}

	public String getObjProp() {
		return objProp;
	}

	public void setObjProp(String objProp) {
		this.objProp = objProp;
	}

	public List<Control> getNodes() {
		return nodes;
	}

	public void setNodes(List<Control> nodes) {
		this.nodes = nodes;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
	
	
}
