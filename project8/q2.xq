<html>
<body>
{
for $x in distinct-values(doc("reed.xml")//course/title)
			return <course>
						<title> { $x } </title>
						<instructors>
							{ for $y in distinct-values(doc("reed.xml")//course[title = $x]/instructor)
							return <instructor>
										{ $y }
									</instructor>
							}
						</instructors>
					</course>
}
</body>
</html>