package automation.application.model;

import java.util.ArrayList;
import java.util.List;

public class ControlType {

	private String id;
	private String controlType;
	private List<String> actions;

	public String getControlType() {
		return controlType;
	}
	public void setControlType(String actionType) {
		this.controlType = actionType;
	}
	public List<String> getActions() {
		return actions;
	}

	public void setActions(List<String> actions) {
		this.actions = actions;
	}

	public void addAction(String action) {
		if(this.actions == null){
			this.actions = new ArrayList<String>();
		}
		this.actions.add(action);
	}

	public void addActions(List<String> actions) {
		if(this.actions == null){
			this.actions = new ArrayList<String>();
		}
		this.actions.addAll(actions);
	}
}
