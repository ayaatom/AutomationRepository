package automation.application.model;

import java.util.List;

public class Control {

	private String id;
	
	private String title;
	private Boolean isChecked;
	private String objProp;
	private String type;
	private String objPropType;
	
	private List<Control> nodes;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getType() {
		return objPropType;
	}

	public String getObjPropType() {
		return objPropType;
	}
	public void setObjPropType(String objPropType) {
		this.objPropType = objPropType;
	}
	
}
