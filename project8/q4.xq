<html>
<body>
{
	for $x in distinct-values(doc("reed.xml")//course/instructor)
			return <instructor>
						<name> { $x } </name>
						<count> { count(doc("reed.xml")//course[instructor = $x]) } </count>
					</instructor>
}
</body>
</html>