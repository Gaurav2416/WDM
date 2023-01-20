import java.io.FileInputStream;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

class DOM {
       public void getPlaceName(Document d) {
        // gets the element by the tag name
        NodeList buildingList = d.getElementsByTagName("building");
        NodeList roomList = d.getElementsByTagName("room");
        NodeList subjectList = d.getElementsByTagName("subj");
        NodeList titleList = d.getElementsByTagName("title");
        // iterate over the list
        for (int k = 0; k < buildingList.getLength(); k++) {
            // get element from the list
            Element buildName = (Element) buildingList.item(k);
            Element roomName = (Element) roomList.item(k);
            Element subject = (Element) subjectList.item(k);
            Element title = (Element) titleList.item(k);
            // condition in to get the ouput
            if (buildName.getTextContent().equals("LIB") && roomName.getTextContent().equals("204")
                    && subject.getTextContent().equals("MATH")) {
                System.out.println("Building Name=" + buildName.getTextContent() + ", Room No ="
                        + roomName.getTextContent() + ", Subject= " + subject.getTextContent()
                        + ", Title= " + title.getTextContent());

            }
        }
    }

    public static void main(String args[]) throws Exception {
        String dir = System.getProperty("user.dir");
        InputStream in = new FileInputStream(dir + "/reed.xml");
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        // parse the doc to read
        Document doc = db.parse(in);
        // object of the class
        DOM dom = new DOM();
        // method to call and get output1
        dom.getPlaceName(doc);
    }

}
